import { IData } from "./interfaces"
import { Joint } from "./Joint"
import { Stylolite } from "./Stylolite"

const map_: Map<string, any> = new Map()

/**
 * @brief A factory of IData.
 *
 * @note All methods are static => similar to a namespace (see math.ts for
 * a namesoace example).
 */
export class Factory {

    static bind(obj: any, name: string = '') {
        name.length === 0 ? map_.set(obj.name, obj) : map_.set(name, obj)
    }

    static create(name: string, params: any = undefined): IData | undefined {
        const M = map_.get(name)
        if (M) {
            return new M(params)
        }
        return undefined
    }

    static exists(name: string): boolean {
        return map_.get(name) !== undefined
    }

    static names(): string[] {
        return Array.from(map_.keys())
    }
}

Factory.bind(Joint, 'Joint')
Factory.bind(Joint, 'Dyke')
Factory.bind(Stylolite, 'Stylolite')
