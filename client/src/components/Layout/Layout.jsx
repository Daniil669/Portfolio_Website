import Starfield from "../StarField/StarField"
import DimWrapper from "../DimWrapper/DimWrapper"

export default function Layout({star, dim, children}) {
    return (
        <div data-active={star}>
            <Starfield active={star}/>
            <DimWrapper dim={dim}>
                {children}
            </DimWrapper>
        </div>
    )
}