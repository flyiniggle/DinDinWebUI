const uuid: () => string = () => new Date().valueOf().toString(36) + Math.random().toString(36).substr(2) 

export default uuid;