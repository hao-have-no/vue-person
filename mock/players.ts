/*
 * @Author: fenghao
 * @Date: 20-8-28 下午4:37
 * @LastEditors: fenghao
 * @LastEditTime: 20-8-28 下午4:37
 * @Description: 玩家信息管理
 */

//路由实现
import {Request, Response} from "express";

import {Hero,Player} from '../src/api/types'
import {heros} from './heros'
import faker from 'faker'
faker.locale = 'zh_CN';

//模拟玩家数据
const playerCount = 100;
const playerList:Player[]=[]


for(let i =0;i<playerCount;i++){
      playerList.push({
            id: i,
            acountname: faker.name.findName(),//账号名
            nickname: faker.name.findName(), //昵称
            avatar: faker.image.avatar(), //用户头像
            level: faker.random.number(30), // ⽤户等级
            exp: faker.random.number(10000), // ⽤户经验值
            rank: faker.random.number(200), // 排位赛段位
            bravepoints: faker.random.number(1000),//勇者积分
            winningstreak: faker.random.number(10),//连胜场次
            wanttoplay: genWantoplay()//想玩的英雄  
      })

}

function genWantoplay(){
      let wanttoplay:Set<Hero> = new Set();
      while(wanttoplay.size<3){
            wanttoplay.add(heros[faker.random.number(9)])
      }
      return Array.from(wanttoplay);
}


export const getPlayers = (req: Request, res: Response)=>{
      const {acountname,page =1,limit=10} = req.query;//从查询参数中获取分页等参数

      let mockList = playerList.filter(item=>{
        if (acountname && item.acountname.indexOf(<string>acountname) < 0){
          return false;
        }
        return true;
      })

      //分页
      // console.log(limit,page);

      const pageList = mockList.filter((item,index)=>index < <number>limit * <number>page && index >= <number>limit * (<number>page -1));

      res.json({
        code:20000,
        data:{
          total:playerList.length,
          players:pageList,
          count:limit,
          page:page
        }
      });
}

export const getPlayer = (req: Request, res: Response)=>{
      const {id} = req.params
      for(let player of playerList){
            if(player.id.toString() === id){
                  return res.json({
                        code:20000,
                        data:{
                              player
                        }
                  })
            }
      }

      return res.json({
            code:70001,
            message:'player not found'
      })
}


//

export const createPlayer=(req: Request, res: Response)=>{
      const {player} = req.body;

      return res.json({
            code: 20000,
            data:{
                  player
            }
      })
}


export const updatePlayer = (req: Request, res: Response) => {
      const {  id} = req.params;
      const { player } = req.body;
      for(let player of playerList){
            if(player.id.toString() === id){
                  return res.json({
                        code:20000,
                        data:{
                              player
                        }
                  })
            }
      }

      return res.json({
            code: 70001,
            message: 'player not found'
      })
}

export const deletePlayer = (req: Request, res: Response) => {
      return res.json({
      code: 20000,
      })
     }
