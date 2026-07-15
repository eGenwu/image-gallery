param(
  [string]$ImageDir = ".\assets\images",
  [string]$Output = ".\gallery-data.js"
)

$ErrorActionPreference = "Stop"

$resolvedImageDir = Resolve-Path -LiteralPath $ImageDir
$items = Get-ChildItem -LiteralPath $resolvedImageDir -File |
  Where-Object {
    $_.Extension -match '^\.(png|jpg|jpeg|webp|gif)$' -and
    $_.Name -notmatch '(?i)(^q005[-_]|hand.?grip|fortalecedor|entrenador[-_]?dedos)'
  } |
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
      description = "Add a description for this image in gallery-data.js."
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
