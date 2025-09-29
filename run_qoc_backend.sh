#!/bin/sh
source /opt/application/*/*_Backend/qoc_tool_env/bin/activate
python /opt/application/*/*_Backend/manage.py runserver localhost:8008
