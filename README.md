# GitHub Pages 图片展示网页

这是一个无构建依赖的静态图片展示页，可以直接部署到 GitHub Pages。

## 本地预览

直接用浏览器打开：

```powershell
E:\e-commerce\github-pages-gallery\index.html
```

如果浏览器限制本地脚本，也可以在目录里启动一个简单服务：

```powershell
cd E:\e-commerce\github-pages-gallery
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 发布到 GitHub Pages

1. 在 GitHub 创建一个新仓库，例如 `image-gallery`。
2. 把 `github-pages-gallery` 目录里的所有文件上传到仓库根目录。
3. 进入仓库 `Settings` -> `Pages`。
4. `Source` 选择 `Deploy from a branch`。
5. `Branch` 选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub 生成访问地址。

## 更新图片

上传新图片：

1. 把图片放到 `assets/images/`。
2. 在 `gallery-data.js` 增加一条数据，填写标题、分类、说明和图片路径。
3. 提交并推送到 GitHub。

修改图片信息：

1. 编辑 `gallery-data.js` 对应条目的 `title`、`type`、`description` 或 `image`。
2. 提交并推送到 GitHub。

删除图片：

1. 从 `gallery-data.js` 删除对应条目。
2. 手动删除 `assets/images/` 中那一个明确图片文件。
3. 提交并推送到 GitHub。

## 自动重建图片列表

如果只是想根据 `assets/images/` 自动生成基础列表，可以运行：

```powershell
cd E:\e-commerce\github-pages-gallery
.\tools\update-gallery.ps1
```

脚本只会扫描图片并覆盖 `gallery-data.js`，不会删除图片文件。自动生成后建议手动补充更好的中文标题和说明。

## 重要限制

GitHub Pages 是静态托管，不能让访问者在网页上永久上传、删除或修改图片。需要在线后台管理时，应增加后端或云存储方案，例如 Supabase、Cloudinary、Firebase、GitHub App。不要把 GitHub Token 写进前端页面。
