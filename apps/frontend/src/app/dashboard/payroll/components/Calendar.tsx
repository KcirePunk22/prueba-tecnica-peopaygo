'use client'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { localizer } from '@ocmi/frontend/helpers/calendar-localizer'
import { getMessageES } from '@ocmi/frontend/helpers/get-message'

const events = [
	{
		title: 'Cumpleaños del jefe',
		notes: 'Hay que comprar el pastel',
		start: new Date(),
		end: addHours(new Date(), 2),
		bgColor: '#fafafa',
	},
]

export default function CalendarPage() {
	const eventStyleGetter = (event: any, start: any, end: string, isSelected: any) => {
		console.log({
			event,
			start,
			end,
			isSelected,
		})
	}

	return (
		<div>
			<Calendar
				culture='es'
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500 }}
				messages={getMessageES() as any}
				eventPropGetter={eventStyleGetter as any}
			/>
		</div>
	)
}
