import Starfield from "../StarField/StarField"
import DimWrapper from "../DimWrapper/DimWrapper"
import { Outlet, useLocation } from "react-router-dom"
import './layout.css'

export default function Layout({star, dim, children}) {
    const location = useLocation()
    const path = location.pathname

    const activeStarField = ['/', '/about', '/projects', '/services', '/contact'] // starfield on these pages

    const isStarField = activeStarField.includes(path)

    return (
        <div className={'layout-frame'} data-active={isStarField}>
            <Starfield active={isStarField}/>
            <DimWrapper dim={path === '/' ? false : true}>
                <Outlet />
            </DimWrapper>
        </div>
    )
}