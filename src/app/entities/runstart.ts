import { Runner } from "./runner";

export class RunStartDTO {
    public CurrentTime: number;
    public Runners: Array<Runner>;
    public StartTime: number;
}