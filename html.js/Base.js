
// external NaN, TypeError, Error, process, require, window, arguments, Object, RegExp;


function console_log() {
  if (!is_dev()) {
    return null;
  }
  return console.log.apply(console, arguments);
};

function keys(v) {
  let arr = [];
  for (let x in v) {
    if (v.hasOwnProperty(x))
      arr.push(x);
  }
  return arr;
}

function is_dev() {
  if (typeof process !== 'undefined' && (process.env.IS_DEVELOPMENT || process.env.IS_DEV)) {
    return true;
  }

  if (typeof window !== 'undefined') {
    var addr = window.location.href;
    return window.console && (addr.indexOf("localhost") > -1 ||
      addr.indexOf("file:///") > -1 ||
      addr.indexOf("127.0.0.1") > -1)
    ;
  }
  return false;
}


export function is_enumerable(v) {
  return is_string(v) || is_array(v) || is_plain_object(v) ;
}

function inspect(arg) {
  return to_string(arg);
}

function to_string(arg) {
  if (arg === null)
    return 'null';

  if (arg === undefined)
    return 'undefined';

  if (is_function(arg))
    return arg.toString().replace("function (){return(", "").replace(/\)?;\}$/, '');

  if (arg === true)
    return 'true';

  if (arg === false)
    return 'false';

  if (is_string(arg)) {
    return '"' + arg + '"';
  }

  if (is_function(arg))
    return (arg.name) ? arg.name + ' (function)' : arg.toString();

  if (is_error(arg))
    return '[Error] ' + to_string(arg.message);

  if (typeof arg === "object" ) {

    if (is_array(arg) || is_arguments(arg)) {
      string[] fin = [];
      foreach ( var x in arg ) {
        fin.push(to_string(x));
      }
      string fin_str = fin.join(",");

      if (is_arguments(arg))
        return "arguments[" + fin_str + "]";
      else
        return "[" + fin_str + "]";
    }

    string[] fin = [];
    for(var x in arg) {
      if (arg.hasOwnProperty(x)) {
        fin.push(to_string(x) + ":" + to_string(arg[x]));
      }
    }
    string fin_str = "{" + fin.join(",") + "}";
    return fin_str;
  }

  var _inspect = (typeof window == "undefined") ? require('util').inspect : function (v) { return "" + v; };
  return _inspect(arg);
} // === string to_string

function own_property(string raw_name, v) {
  string name = trim(raw_name);
  if (!v.hasOwnProperty(name))
    return undefined;
  return v[name];
} // === func own_property

function return_arguments(...args) { return arguments; }
function to_arguments() { return arguments; }

function to_array(val) {
  if (!is_array(val) && val.constructor != arguments.constructor)
    throw new Error("Invalid value for to_array: " + to_string(val));

  var arr = [];
  int len = val.length;
  for (int i = 0; i < len; i++) {
    arr.push(val[i]);
  }
  return arr;
} // === func

// Removes begining slash, if any.
function to_var_name(string val) {
  return to_var_name(val, "_");
}

function to_var_name(string val, string delim) {
  return val.replace(/^[\/]+/, "").replace(/[^a-zA-Z-0-9\_\-]+/g, delim);
}

function repeat(unsigned short num, func) {
  for (var i = 0; i < num; i++) { func(); }
  return true;
}


