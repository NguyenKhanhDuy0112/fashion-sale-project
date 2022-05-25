import useCountdown from "../../hooks/useCountdown";

function Countdown() {

    const timer = useCountdown({endDate: new Date("6/20/2022 23:59")})

    return ( 
        <div className="countdown">
            <span className="countdown__number">
                {timer ? timer.days < 10 ? `0${timer.days}`: timer.days : '00'}
            </span>

            <span className="countdown__distance">:</span>

            <span className="countdown__number">
                {timer ? timer.hours < 10 ? `0${timer.hours}`: timer.hours : '00'}
            </span>

            <span className="countdown__distance">:</span>

            <span className="countdown__number">
                {timer ? timer.minutes < 10 ? `0${timer.minutes}`: timer.minutes : '00'}
            </span>

            <span className="countdown__distance">:</span>

            <span className="countdown__number">
                {timer ? timer.seconds < 10 ? `0${timer.seconds}`: timer.seconds : '00'}
            </span>
        </div>
     );
}

export default Countdown;