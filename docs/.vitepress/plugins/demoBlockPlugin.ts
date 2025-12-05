import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

// 自定义 demo block 插件
export function demoBlockPlugin(md: MarkdownIt) {
  // 解析 :::demo 块
  md.use(container, 'demo', {
    validate: function(params: string) {
      return params.trim() === 'demo'
    },
    render: function (tokens, idx, options, env, self) {
      if (tokens[idx].nesting === 1) {
        // 开始标签 - 找到结束标签的索引
        let i = idx
        while (i < tokens.length && !(tokens[i].nesting === -1 && tokens[i].type === 'container_demo_close')) {
          i++
        }
        
        // 获取原始内容
        let rawContent = ''
        for (let j = idx + 1; j < i; j++) {
          if (tokens[j].type === 'fence' || tokens[j].type === 'html_block') {
            rawContent += tokens[j].content
          }
        }
        
        // 渲染内容
        let content = ''
        for (let j = idx + 1; j < i; j++) {
          content += self.renderToken(tokens, j, options)
        }
        
        // 返回ApronDesignDemoBlock组件，传递渲染后的内容和原始代码（作为隐藏元素）
        return `<ApronDesignDemoBlock>${content}<div class="demo-block-raw-code" style="display: none;">${md.utils.escapeHtml(rawContent)}</div></ApronDesignDemoBlock>`
      } else {
        // 结束标签
        return ''
      }
    }
  })
}
