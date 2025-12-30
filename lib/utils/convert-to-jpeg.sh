#!/bin/bash

PHOTO_DIR="./public/photos"

shopt -s nocaseglob

for file in "$PHOTO_DIR"/*; do
  # Skip directories
  [ -d "$file" ] && continue

  ext="${file##*.}"

  # Skip JPEGs
  if [[ "$ext" == "jpg" || "$ext" == "jpeg" ]]; then
    continue
  fi

  base="${file%.*}"
  output="${base}.jpg"

  echo "Converting: $file → $output"

  sips -s format jpeg "$file" --out "$output" >/dev/null

  if [ -f "$output" ]; then
    rm "$file"
    echo "Deleted original: $file"
  else
    echo "Failed to convert: $file"
  fi
done

echo "Conversion complete"
