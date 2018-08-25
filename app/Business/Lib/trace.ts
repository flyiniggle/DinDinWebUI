function trace<T>(entity: T): T {
    console.log(entity);

    return entity;
}

export default trace;