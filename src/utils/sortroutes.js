function compareArrays(arr1, arr2) {
    let index = 0
    //console.log(arr1, arr2)

    for (const _ of arr1) {

        if (index == arr2.length) {
            return 1
        }

        const first = typeof (arr2[index]) === "string" ? arr1[index].toString() : arr1[index];
        const last = typeof (arr1[index]) === "string" ? arr2[index].toString() : arr2[index];

        if (first > last) {
            //console.log(`${arr1[index]}>${arr2[index]}`)
            return 1
        } else if (first < last) {
            //console.log(`${arr1[index]}<${arr2[index]}`)
            return -1
        }
        index++
    }

    if (index < arr2.length) {
        return -1
    }

    return 0
}

const sortRoutes = (data, acessorFn) => {
    const routes = data.map((elem) => {
        return {
            original: elem,
            processed: ('' + acessorFn(elem)).match(/\d+|\D+/g).join("#").replace("-", "").split("#").map((el) => isNaN(Number(el)) ? el : Number(el))
        }
    })
    //console.log(routes)
    return routes
        .sort((a, b) => compareArrays(a.processed, b.processed))
        .map((elem) => elem.original)
}

const fullSort = (data, vtypeAcessorFn, rnameAcessorFn) => {

}

export default sortRoutes