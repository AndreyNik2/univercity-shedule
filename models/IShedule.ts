export interface IShedule {
    dayOfWeek: number,
number: number,
subject: string,
subject_short: string,
teacher: string,
class: string,
start_time: string,
end_time: string,
tagId: number,
tag: string
}

export interface IDataShedule {
    data: IShedule[]
}