import { useEffect, useState } from "react"

interface DateCountdown {
    endDate: Date
}

interface Timer{
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

const useCountdown = (props: DateCountdown) => {

    const { endDate } = props

    const [time, setTime] = useState<Timer>()

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(handleCalculateTimeLeft());
        }, 1000);
        
        return () => clearTimeout(timer);
    })

    const handleCalculateTimeLeft = () => {

        let difference = +new Date(endDate) - +new Date();

        let timeLeft

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft
    }

    return time
}

export default useCountdown