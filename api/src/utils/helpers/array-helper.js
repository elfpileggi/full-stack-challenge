const ObjectHelper = require('./object-helper')

module.exports = {
  filterBy: function (list, params) {
    if (ObjectHelper.isEmpty(params)) return list
    
    const compare = originObj => paramsObj => {
      return (typeof paramsObj === "object" ? contains(originObj)(paramsObj) : paramsObj === originObj)
    }
    const contains = originObj => paramsObj => {
      return Object.keys(originObj).every(key => paramsObj.hasOwnProperty(key) && compare(originObj[key])(paramsObj[key]))
    } 

    return list.filter(contains(params))
  }
}