import { Google } from "./lib/google";
import { Drive } from "./lib/drive";

export const instance = new Google({}).getInstance();

export const drive = new Drive(instance);