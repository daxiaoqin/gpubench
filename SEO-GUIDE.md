# Search Engine Submission Guide — GPUBench.online

## 1. Google Search Console (最重要)
- 打开 https://search.google.com/search-console
- 添加 `gpubench.online` 作为 Domain 属性
- 验证方式：在 Hostinger DNS 添加 TXT 记录（Google 给一个字符串）
- Hostinger → Domains → DNS Zone → Add Record → type TXT
- 添加后等几分钟验证
- 提交 Sitemap: `https://gpubench.online/sitemap.xml`
- 请求索引首页、Calculator、GPUs 页面

## 2. 百度资源平台 (百度站长)
- 打开 https://ziyuan.baidu.com/
- 注册/登录百度账号
- 添加网站 `gpubench.online`
- 验证：在 Hostinger DNS 添加 TXT 记录（百度给一个字符串）
- 提交 Sitemap: `https://gpubench.online/sitemap.xml`
- 由于网站是英文内容+海外服务器，百度收录可能较慢，但中文子站 `/zh/` 会更容易被收录

## 3. Yandex Webmaster (俄罗斯最大搜索引擎)
- 打开 https://webmaster.yandex.com/
- 添加 `gpubench.online`
- 验证：DNS TXT 记录或上传 HTML 文件
- 提交 Sitemap

## 4. Bing Webmaster Tools
- 打开 https://www.bing.com/webmasters/
- 可以用 Google 账号直接导入（如果 GSC 已配好就一键导入）
- 提交 Sitemap

## 5. 其他搜索引擎
- **DuckDuckGo**: 无需手动提交，爬虫自动抓取
- **Naver (韩国)**: https://webmastertool.naver.com/
- **Yandex** 已覆盖俄罗斯

## 验证文件（备用方案）
如果 DNS 验证不方便，可以将验证文件放在 `public/` 目录下：
- `public/googlexxxxx.html`
- `public/baidu_verify_xxxxx.html`

## 加速收录技巧
1. 在 GitHub 仓库 README 里加网站链接（Google 爬 GitHub 很勤快）
2. 在 Reddit r/gpumining, r/cryptomining 等社区发帖（自然引流+外链）
3. 在相关论坛签名档加网站链接
4. 网站内容持续更新（搜索引擎更喜欢活跃站点）
5. JSON-LD 结构化数据已添加，有助于 Rich Snippet 展示
