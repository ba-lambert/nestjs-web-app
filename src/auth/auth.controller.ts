import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, loginUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll(@Request() req,@Res() res:Response) {

    return this.authService.findAll(req.session.passport.user.userId,res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() userdata: loginUserDto) {
    const user = await this.authService.validateUser(userdata.username, userdata.password)

    // if(!user){
    //   console.log(user);
    // }
    return {
      User: user,
      message: 'User logged in successful'
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Post('/logout')
  logout(@Request() req): Promise<any> {
    return new Promise((resolve, reject) => {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            reject({ msg: 'Error ending the session', error: err });
          } else {
            resolve({ msg: 'The user session has ended' });
          }
        });
      } else {
        resolve({ msg: 'No session found' });
      }
    });
  }
}
