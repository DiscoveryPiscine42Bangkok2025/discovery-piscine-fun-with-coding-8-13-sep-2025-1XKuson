if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    echo "$1"
    [ $# -gt 1 ] && echo "$2"
    [ $# -gt 2 ] && echo "$3"
fi