SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
cd $SCRIPT_DIR/../../.remixapp;
npm install --legacy-peer-deps
cd $SCRIPT_DIR/../../
npm install --legacy-peer-deps
