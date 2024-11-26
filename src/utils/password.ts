import bcrypt from 'bcrypt'

export class Password{
    
    static hashPassword = async(password:string)=>{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        return hash

    }
    static comparePassword = async(password:string,hash:string)=>{
        const isSame = bcrypt.compareSync(password,hash)
        return isSame
    }
}
