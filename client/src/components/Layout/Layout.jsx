import Starfield from "../StarField/StarField"
import DimWrapper from "../DimWrapper/DimWrapper"
import { Outlet } from "react-router-dom"
import './layout.css'

export default function Layout({star, dim, children}) {
    return (
        <div className={'layout-frame'} data-active={star}>
            <Starfield active={star}/>
            <DimWrapper dim={dim}>
                <Outlet />
            </DimWrapper>
        </div>
    )
}