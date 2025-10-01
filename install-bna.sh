#!/bin/bash

# List of all components
components=(
  accordion
  action-sheet
  alert
  alert-dialog
  audio-player
  audio-recorder
  audio-waveform
  avatar
  avoid-keyboard
  badge
  bottom-sheet
  button
  camera
  camera-preview
  card
  carousel
  checkbox
  collapsible
  color-picker
  combobox
  date-picker
  file-picker
  gallery
  hello-wave
  icon
  image
  input
  input-otp
  link
  media-picker
  mode-toggle
  onboarding
  parallax-scrollview
  picker
  popover
  progress
  radio
  scroll-view
  searchbar
  separator
  share
  sheet
  skeleton
  spinner
  switch
  table
  tabs
  text
  toast
  toggle
  video
  view
)

# File to store failed installs
failed_file="failed-components.txt"

# Clear old log
> "$failed_file"

echo "🚀 Starting installation of all BNA UI components..."
echo "-----------------------------------------------"

# Loop through components
for component in "${components[@]}"; do
  echo "🧩 Adding $component..."
  if npx bna-ui add "$component" --overwrite; then
    echo "✅ $component added successfully."
  else
    echo "❌ Failed to add $component. Saving for later..."
    echo "$component" >> "$failed_file"
  fi
  echo "-----------------------------------------------"
done

# Summary
if [ -s "$failed_file" ]; then
  echo "⚠️ Some components failed to install. See $failed_file for details."
else
  echo "🎉 All components installed successfully!"
fi
