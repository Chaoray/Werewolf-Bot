# Werewolf bot 狼人殺機器人

旨在做出能在DC上暢玩狼人殺的機器人

# 使用

隨便找個託管，或用自己的電腦開都可以

build: 
```
npm install
```

run:
```
node main.js
```

# 貢獻

因為遊戲規則很複雜，所以Code也很複雜，當然有一部份也是因為本人實力不足  
程式碼我已經盡量模組化，應該不會太難懂

如果有更好的pattern、naming都歡迎發PR告訴我  
錯字的話....大家大概都不是國文老師  

另外檔案內還有很多TODO  
建議安裝 [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

大綱：
1. 自爆技能
2. 白天/殺人投票系統
3. 輸贏判斷
4. 技能描述系統

## 機器人架構

採用自動管理指令、事件的模組化結構，詳細情形可以參考：[DiscordBotTemplate](https://github.com/Chaoray/DiscordBotTemplate)

## 狼人殺的實現架構

![](/uml.png)
