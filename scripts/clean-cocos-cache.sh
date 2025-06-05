#!/usr/bin/env bash
# 清理 Cocos Creator 在本仓库根目录生成的缓存（解决 library json ENOENT、脚本类未刷新等）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
for d in library temp build; do
  if [[ -e "$ROOT/$d" ]]; then
    rm -rf "$ROOT/$d"
    echo "已删除: $ROOT/$d"
  fi
done
echo "完成。请完全退出 Creator 后重新打开工程，等待资源重新导入。"
