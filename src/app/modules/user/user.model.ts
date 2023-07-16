import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { iUser, iUserModel } from './user.interface'

const userSchema = new Schema<iUser, iUserModel>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }
    ],
    reading: [
      {
        book: {
          type: Schema.Types.ObjectId,
          required: true
        },
        stage: {
          type: String,
          required: true,
          enum: ['Reading', 'Reading Soon', 'Finished']
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.statics.generateHashPassword = async function (plainPassword) {
  return await bcrypt.hash(plainPassword, Number(config.soltRounds))
}

userSchema.statics.checkPassword = async function (givenPassword, savedPassword) {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function () {
  this.password = await User.generateHashPassword(this.password)
})

userSchema.pre('findOneAndUpdate', async function () {
  const user = <Partial<iUser>>this.getUpdate()

  if (user?.password) {
    user.password = await User.generateHashPassword(user.password)
  }
})

const User = model<iUser, iUserModel>('User', userSchema)

export default User
