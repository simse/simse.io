import { breadcrumbs } from "../stores";
    
const setBreadcrumbs = (smallCrumbs: Array<Array<any>>) => {
    let crumbs = smallCrumbs.map(crumb => ({
        path: crumb[0],
        name: crumb[1]
    }))

    breadcrumbs.update(_ => crumbs)
}

export {
    setBreadcrumbs
}