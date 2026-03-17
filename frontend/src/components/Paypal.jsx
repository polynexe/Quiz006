import React from 'react'
import { useRef, useEffect } from 'react';

function Paypal() {
    const paypal = useRef()
    useEffect(() => {
        const container = paypal.current

        if (!container || !window.paypal) {
            return undefined
        }

        container.innerHTML = ''

        const buttons = window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            description: 'Cool looking table',
                            amount: {
                                currency_code: 'USD',
                                value: 100.00,
                            }
                        }
                    ]
                })
            }, onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
            },
            onError: err => {
                console.log(err)
            }
        })

        buttons.render(container)

        return () => {
            if (typeof buttons.close === 'function') {
                buttons.close()
            }

            container.innerHTML = ''
        }
    }, [])

return (
<div>
    <div ref={paypal}></div>
</div>
)
}

export default Paypal