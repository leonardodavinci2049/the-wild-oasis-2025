
import supabase from "./supabase"

export async function getSettings() {
	const { data, error } = await supabase.from("settings").select("*").single()

	if (error) {
		console.error(error)
		throw new Error("Settings could not be loaded")
	}

	return data
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(dataSetting: { [key: string]: number }) {
	const { data, error } = await supabase
		.from("settings")
		.update(dataSetting)
		// There is only ONE row of settings, and it has the ID=1, and so this is the updated one
		.eq("id", 1)
		.single()

	if (error) {
		console.error(error)
		throw new Error("Settings could not be updated")
	}
	return data
}
