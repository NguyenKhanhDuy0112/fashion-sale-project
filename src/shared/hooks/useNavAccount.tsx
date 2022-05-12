import { useEffect, useState } from "react"

export const useNavAccount = (): [boolean, () => void] => {
    const [value, setValue] = useState(false)

    const toggleValue = () => setValue(!value)
    useEffect(() => {
        setValue(value)
    },[value])

    return [value, toggleValue]
  }

  