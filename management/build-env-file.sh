# https://stackoverflow.com/questions/6393551/what-is-the-meaning-of-0-in-a-bash-script
cd "${0%/*}"

echo "window.env = {
  WT_SEARCH_API: \"$WT_SEARCH_API\",
  WT_READ_API: \"$WT_READ_API\",
};" > ../public/env.js