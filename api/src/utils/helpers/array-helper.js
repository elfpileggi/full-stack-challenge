const ObjectHelper = require('./object-helper')

module.exports = {
  filterBy: function (list, params) {
    if (ObjectHelper.isEmpty(params)) return list

    const customAssert = (to, from) => {
      if (`${from}`.startsWith('>')) return to > from.substr(1)
      return to === from
    }
    const compareDeph = (paramsObj, originObj) => {
      return paramsObj.every(paramsItem => originObj.some(originItem => compare(paramsItem)(originItem)))
    }
    const compare = paramsObj => originObj => {
      if (Array.isArray(originObj)) return compareDeph(paramsObj, originObj)
      return (typeof originObj === 'object') ? contains(paramsObj)(originObj) : customAssert(originObj, paramsObj)
    }
    const contains = paramsObj => originObj => {
      return Object.keys(paramsObj).every(key => {
        const result = key in originObj && compare(paramsObj[key])(originObj[key])
        return result
      })
    }

    return list.filter(contains(params))
  }
}
