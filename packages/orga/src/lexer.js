const { escape } = require('./utils')
const timestamp = require('./timestamp')

function Syntax() {
  this.rules = []
}

Syntax.prototype = {
  define: function(name, pattern, post = () => { return {} }) {
    this.rules.push({
      name,
      pattern,
      post,
    })
  },

  update: function(name, pattern) {
    const i = this.rules.findIndex(r => r.name === name)
    var newRule = { name, post: () => {} }
    if (i !== -1) {
      newRule = this.rules.splice(i, 1)[0]
    }
    newRule.pattern = pattern
    this.rules.splice(i, 0, newRule)
  }
}

var org = new Syntax()

function headlinePattern(todos = ['TODO', 'DONE']) {
  return RegExp(`^(\\*+)\\s+(?:(${todos.map(escape).join('|')})\\s+)?(?:\\[#(A|B|C)\\]\\s+)?(.*?)\\s*(:(?:\\w+:)+)?$`)
}

org.define('headline', headlinePattern(), m => {
  const level = m[1].length
  const keyword = m[2]
  const priority = m[3]
  const content = m[4]
  const tags = (m[5] || '').split(':').map( str => str.trim()).filter(String)
  return { level, keyword, priority, content, tags }
})

org.define('keyword', /^\s*#\+(\w+):\s*(.*)$/, m => {
  const key = m[1]
  const value = m[2]
  return { key, value }
})

const PLANNING_KEYWORDS = ['DEADLINE', 'SCHEDULED', 'CLOSED']
org.define('planning', RegExp(`^\\s*(${PLANNING_KEYWORDS.join('|')}):\\s*(.+)$`), m => {
  const keyword = m[1]
  return { keyword, ...timestamp.parse(m[2]) }
})

org.define('timestamp', RegExp(timestamp.pattern, 'i'), m => {
  return timestamp.parse(m)
})

org.define('block.begin', /^\s*#\+begin_(\w+)(.*)$/i, m => {
  const type = m[1]
  const params = m[2].split(' ').map( str => str.trim()).filter(String)
  return { type, params }
})

org.define('block.end', /^\s*#\+end_(\w+)$/i, m => {
  const type = m[1]
  return { type }
})

org.define('drawer.end', /^\s*:end:\s*$/i)

org.define('drawer.begin', /^\s*:(\w+):\s*$/, m => {
  const type = m[1]
  return { type }
})

org.define('list.item', /^(\s*)([-+]|\d+[.)])\s+(?:\[(x|X|-| )\][ \t]+)?(?:([^\n]+)[ \t]+::[ \t]*)?(.*)$/, m => {
  const indent = m[1].length
  const bullet = m[2]
  const tag = m[4]
  const content = m[5]

  var ordered = true
  if ( [`-`, `+`].includes(bullet) ) {
    ordered = false
  }

  var result = { indent, ordered, content, tag }
  if (m[3]) {
    var checked = m[3] !== ' '
    result.checked = checked
  }
  return result
})

org.define('table.separator', /^\s*\|-/)

org.define('table.row', /^\s*\|(\s*.+\|)+\s*$/, m => {
  const cells = m[1].split('|').map( str => str.trim()).filter(String)
  return { cells }
})

org.define('horizontalRule', /^\s*-{5,}\s*$/)

org.define('comment', /^\s*#\s.*$/)

org.define('footnote', /^\[fn:(\w+)\]\s+(.*)$/, m => {
  const label = m[1]
  const content = m[2]
  return { label, content }
})

function Lexer(options = require('./defaults')) {
  this.syntax = org
  const { todos } = options
  if (todos) {
    this.updateTODOs(todos)
  }
}

Lexer.prototype = {
  tokenize: function (input) {
    for ( const { name, pattern, post } of this.syntax.rules ) {
      const m = pattern.exec(input)
      if (!m) { continue }
      var token = { name, raw: input }
      token.data = post(m)
      return token
    }

    const trimed = input.trim()
    if (trimed === '') {
      return { name: `blank`, raw: input }
    }

    return { name: `line`, raw: input }
  },

  updateTODOs: function(todos) {
    this.syntax.update(`headline`, headlinePattern(todos))
  }

}

module.exports = Lexer
