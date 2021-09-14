const ObjectHelper = require('./object-helper')

module.exports = {
  filterBy: function (list, params) {
    if (ObjectHelper.isEmpty(params)) return list

    const compareDeph = (paramsObj, originObj) => {
      return paramsObj.every(paramsItem => originObj.some(originItem => compare(paramsItem)(originItem)))
    }
    const compare = paramsObj => originObj => {
      if (Array.isArray(originObj)) return compareDeph(paramsObj, originObj)
      return (typeof originObj === "object") ? contains(paramsObj)(originObj) : originObj === paramsObj
    }
    const contains = paramsObj => originObj => {
      return Object.keys(paramsObj).some(key => {
        const result = originObj.hasOwnProperty(key) && compare(paramsObj[key])(originObj[key])
        return result
      })
    } 

    return list.filter(contains(params))
  }
}