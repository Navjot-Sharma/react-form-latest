
// ----------------------Helper functions of helper functions-------------------------------------------

function isIndex(k) {
  return /^\d+$/.test(k)
}

function isArrayOrObject(val) {
  return Object(val) === val
}

function isEmptyObject(val) {
  return Object.keys(val).length === 0
}

function fill (a, obj, v, mod, override = false) {
  var k = a.shift()

  if (a.length > 0) {
      obj[k] = obj[k] || (isIndex(a[0]) ? [] : {})

      if (!isArrayOrObject(obj[k])) {
          if (override) {
              obj[k] = {}
          } else {
              if (!(isArrayOrObject(v) && isEmptyObject(v))) {
                  throw new Error(
                      'Trying to redefine `' + k + '` which is a ' + typeof obj[k]
                  )
              }

              return
          }
      }

      fill(a, obj[k], v, mod)
  } else {
      if (!override && isArrayOrObject(obj[k]) && !isEmptyObject(obj[k])) {
          if (!(isArrayOrObject(v) && isEmptyObject(v))) {
              throw new Error("Trying to redefine non-empty obj['" + k + "']")
          }

          return
      }

      obj[k] = _process(v, mod)
  }
}

function parsePath(path, sep) {
  const blacklist = ['__proto__', 'prototype', 'constructor']
  const blacklistFilter = function (part) {
    return blacklist.indexOf(part) === -1
  }
  if (path.indexOf('[') >= 0) {
    path = path.replace(/\[/g, sep).replace(/]/g, '')
  }

  const parts = path.split(sep)

  const check = parts.filter(blacklistFilter)

  if (check.length !== parts.length) {
    throw Error('Refusing to update blacklisted property ' + path)
  }

  return parts
}


function _process(v, mod) {
  var i
  var r

  if (typeof mod === 'function') {
      r = mod(v)
      if (r !== undefined) {
          v = r
      }
  } else if (Array.isArray(mod)) {
      for (i = 0; i < mod.length; i++) {
          r = mod[i](v)
          if (r !== undefined) {
              v = r
          }
      }
  }

  return v
}



export const mapKeysToObject = (obj, mods) => {
  obj = JSON.parse(JSON.stringify(obj));
  const separator = '.';

  Object.keys(obj).forEach(function (k) {
    var mod = mods === undefined ? null : mods[k]
    // normalize array notation.
    var ok = parsePath(k, separator).join(separator)

    if (ok.indexOf(separator) !== -1) {
      fill(ok.split(separator), obj, obj[k], mod)
      delete obj[k]
    } else {
      obj[k] = _process(obj[k], mod)
    }
  })

  return obj
}

export const copy = obj => obj && JSON.parse(JSON.stringify(obj));

export const empty = val => {
  return val === null || val === undefined || val === '' || (Array.isArray(val) && val.length === 0);
};

export const overflowElipsis = (str = '', length = 10, trim = 'right') => {
  if (str.length > length) {
    switch (trim) {
      case 'right': str = str.substr(0, length) + '...'; break;
      case 'left': str = '...' + str.substr(-length); break;
      // case 'center': str = str.substr(0, length) + '...'; break;

      default: str = str.substr(0, length) + '...'; break;
    }
  }
  return str;
};

