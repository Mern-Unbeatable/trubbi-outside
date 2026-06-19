import { logoIcon, logoTagline, logoWordmark } from '../../assets/landing'

export default function LogoPill({ className = '' }) {
  return (
    <div
      className={`inline-flex h-[31px] shrink-0 items-center rounded-full bg-bg-primary px-[7.719px] shadow-[0_0_2.5px_rgba(0,0,0,0.09)] lg:h-12 lg:px-3 ${className}`}
    >
      <div className="flex items-start gap-1 lg:gap-[6px]">
        <img
          src={logoIcon}
          alt=""
          className="h-[20.584px] w-[14.452px] shrink-0 object-contain lg:h-8 lg:w-[22px]"
        />
        <div className="relative inline-grid shrink-0 place-items-start leading-none">
          <img
            src={logoWordmark}
            alt=""
            className="col-start-1 row-start-1 h-[15.452px] w-[58.445px] object-contain object-left lg:h-6 lg:w-[91px]"
          />
          <img
            src={logoTagline}
            alt=""
            className="col-start-1 row-start-1 ml-[8.44px] mt-[16.34px] h-[4.234px] w-[41.559px] object-contain object-left lg:ml-[13px] lg:mt-[25px] lg:h-[7px] lg:w-[65px]"
          />
        </div>
      </div>
    </div>
  )
}
