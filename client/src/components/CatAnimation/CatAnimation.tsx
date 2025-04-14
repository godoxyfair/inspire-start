import { Player } from '@lottiefiles/react-lottie-player'
import animationData from './Animation - 1744053915834.json'
import animationHertz from './Animation - hertz.json'
import animationHertz2 from './Animation - hertz2.json'

type Props = {
  catRef: React.RefObject<Player | null>
  isShowHertz: boolean
  isShowHertz2: boolean
}

export const CatAnimation: React.FC<Props> = ({
  catRef,
  isShowHertz,
  isShowHertz2,
}) => {
  return (
    <div className="relative py-[10px] px-[24px]">
      {(isShowHertz || isShowHertz2) && (
        <Player
          src={isShowHertz2 ? animationHertz2 : animationHertz}
          autoplay
          loop
          style={{ height: '100px', width: '100px' }}
          className="absolute right-[24px]"
        />
      )}
      <Player
        ref={catRef}
        src={animationData}
        autoplay={false}
        loop
        style={{ height: '500px', width: '500px' }}
      />
    </div>
  )
}
