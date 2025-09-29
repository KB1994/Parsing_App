#!/bin/sh
source /opt/application/qooc_tools/*_Backend/qoc_tool_env/bin/activate
python /opt/application/qooc_tools/*_Backend/manage.py runserver localhost:8008
