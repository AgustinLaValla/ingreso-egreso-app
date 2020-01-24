export class IngresoEgreso { 
    public description:string;
    public monto: number;
    public tipo: string;
    public uid?: string;

    constructor(ieObj: IE) { 
        this.description = ieObj && ieObj.description || null;
        this.monto = ieObj && ieObj.monto || null;
        this.tipo = ieObj && ieObj.tipo || null;
        // this.uid = ieObj  && ieObj.uid || null;
    }

}

interface IE {
    description:string;
    monto: number;
    tipo: string;
    // uid?: string;
}