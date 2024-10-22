#!/bin/bash

usage="
Usage: npm test -- [OPTIONS]

Required arguments:
    -P <Project>        Specify codecept project to run tests from. This
                        effectively selects ./codecpt/<Project>.codecept.conf.js. 
                        Defaults to 'web' if not specified.
                        
    -E <ENV>            Specify the Target Test Environment. 
                        Allowed Values : dev,staging,prod. 
                        Defaults to 'prod' if not specified
    
    -B <BROWSER>        Specify the Web Browser for running tests. 
                        Allowed Values : chrome, firefox. 
                        Defaults to 'chrome' if not specified
    
Optional arguments:
    -T <Test Tag>       Specify a test tag to grep tests by tag. Not using this
                        flag causes all tests of the project to be executed.
    -C <Json string>    Specify the override config in JSON string format. 
                        Defaults to empty string if not specified.
    -D <Json string>    Specify the override data in JSON string format. 
                        Defaults to empty string if not specified.
    -h                  Use this flag (no arguments) to run in headless mode.
                        Defaults to false if not specified.
    -r                  Generate test report using allure. This just generates
                        the report under ./report/, it doesn't serve it. Note:
                        ./report/ directory will be OVERWRITTEN if it exists!
    -c                  Cleans the codeceptjs output folder. Default location 
                        is ./output/<Project>
    -s                  Skips the execution of tests.

Example #1 - Runs 'web' tests in chrome headless mode for env 'prod', filters for tag 'home' and generates report:

    npm test -- -P web -E prod -B chrome -T '(?=.*@home)' -h -r

"

function usage() {
    echo "$usage";
    exit 1;
}

codecept_project="web"
env="prod"
browser="chrome"
test_tag_flag="(?=.*)"
override_config=""
override_data=""
generate_report='false'
headless_mode='false'
clean_output='false'
skip_tests='false'
while getopts "P:E:B:T:D:C:chrs" opt; do
    case $opt in
        P)
            codecept_project="$OPTARG"
            ;;
        E)
            env="$OPTARG"
            ;;
        B)
            browser="$OPTARG"
            ;;
        C)
            override_config="$OPTARG"
            ;;
        D)
            override_data="$OPTARG"
            ;;
        T)
            test_tag_flag="$OPTARG"
            ;;
        c)  
            clean_output='true'
            ;;
        h)
            headless_mode='true'
            ;;
        r)
            generate_report='true'
            ;;
        s)
            skip_tests='true'
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
        *)
            usage
            ;;
    esac
done

if [[ -z "$codecept_project" ]]; then
    echo "Please provide Project name"
    usage
fi

if [[ -z "$env" ]]; then
    echo "Please provide Environment name"
    usage
fi

if [[ -z "$browser" ]]; then
    echo "Please provide Browser name"
    usage
fi

case "$codecept_project" in
    (web)
        export PLATFORM=$codecept_project
        ;;
    *)
        echo "ERROR: $0:$LINENO"
        echo "ERROR: $codecept_project project is not yet supported by test runner"
        exit 1
        ;;
esac

case "$env" in
    (dev|staging|prod)
        export ENV="$env"
        ;;
    *)
        echo "ERROR: $0:$LINENO"
        echo "ERROR: $env environment is not yet supported by test runner"
        exit 1
        ;;
esac

case "$browser" in
    (chrome|firefox)
        export BROWSER="$browser"
        ;;
    *)
        echo "ERROR: $0:$LINENO"
        echo "ERROR: $browser environment is not yet supported by test runner"
        exit 1
        ;;
esac

export HEADLESS_MODE="$headless_mode"
export OVERRIDE_CONFIG="$override_config"
export OVERRIDE_DATA="$override_data"

if [[ $clean_output == 'true' ]]; then
    echo "Cleaning [./output/$codecept_project] folder before running tests"
	rm -rf ./output/$codecept_project/*
fi

if [[ $skip_tests == 'false' ]]; then
    
    echo "Running $codecept_project tests for env($env)"
    npx codeceptjs run \
    --config=./codecept/$codecept_project.codecept.conf.js \
    --verbose \
    --grep $test_tag_flag
fi

if [[ $generate_report == 'true' ]]; then
    allure generate --clean -o "report_$codecept_project" "./output/$codecept_project"
fi