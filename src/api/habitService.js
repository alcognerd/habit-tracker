import axios from "axios";

export class HabitService {
	backendUrl = "http://localhost:5000/habits";

	constructor() {}

	async createHabit(habitData) {
		const dataToSend = new FormData();
		for (const key in habitData) {
			dataToSend.append(key, habitData[key]);
		}
		const res = await axios.post(this.backendUrl, dataToSend, { withCredentials: true });
		console.log(res);
	}
}
