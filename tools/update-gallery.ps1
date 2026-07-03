param(
  [string]$ImageDir = ".\assets\images",
  [string]$Output = ".\gallery-data.js"
)

$ErrorActionPreference = "Stop"

$resolvedImageDir = Resolve-Path -LiteralPath $ImageDir
$items = Get-ChildItem -LiteralPath $resolvedImageDir -File |
  Where-Object { $_.Extension -match '^\.(png|jpg|jpeg|webp|gif)$' } |
  Sort-Object Name |
  ForEach-Object {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
    $type = "gallery"

    if ($baseName -match '(?i)hero') { $type = "hero" }
    elseif ($baseName -match '(?i)feature') { $type = "feature" }
    elseif ($baseName -match '(?i)specs') { $type = "specs" }
    elseif ($baseName -match '(?i)compare') { $type = "compare" }
    elseif ($baseName -match '(?i)lifestyle') { $type = "lifestyle" }
    elseif ($baseName -match '(?i)closing') { $type = "closing" }

    [pscustomobject]@{
      id = $baseName
      title = $baseName -replace '[-_]+', ' '
      type = $type
      description = "请在 gallery-data.js 中补充这张图片的说明。"
      image = "./assets/images/$($_.Name)"
    }
  }

$json = $items | ConvertTo-Json -Depth 5
if (-not $json) {
  $json = "[]"
}

$content = "window.GALLERY_ITEMS = $json;`n"
Set-Content -LiteralPath $Output -Value $content -Encoding UTF8

Write-Host "Updated $Output with $($items.Count) image item(s)."
