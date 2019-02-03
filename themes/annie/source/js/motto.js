var mottos = [];

mottos.push('何为正道，何为魔道。');
mottos.push('凡而有进，厉而不魔。');
mottos.push('天地不仁，以万物为刍狗。');
mottos.push('人都是惜命的，而他就是我的命。');
mottos.push('金铃清脆噬血误，一生总被痴情诉。');
mottos.push('不是我不想要，是有些东西，我不配拥有。');
mottos.push('三生七世，永堕阎罗，只为情故，虽死不悔。');
mottos.push('多少年后，你回首往事，还记得当年，<br>曾有人对你，低声诉说心语么？');
mottos.push('红颜远，相思苦，几番意，难相付。<br>十年情思百年渡，不斩相思不忍顾。');
mottos.push('铃铛咽，百花凋，人影渐瘦鬓如霜。<br>深情苦，一生苦，痴情只为无情苦。');
mottos.push('芳心苦，忍回顾，悔不及，难相处。<br>金铃清脆噬血误， 一生总被痴情诉。');
mottos.push('江湖生涯原是梦；<br>心醒、酒醒、梦不醒、梦归何处？<br>剑指之处，身处之地。');
mottos.push('若是相爱，<br>即便是一天、一刻，<br>哪怕只是一瞬，<br>那也是一世，也会成为永恒。');
mottos.push('一个人感觉最孤独的时候是什么？<br>是不是独自面对着整个世界的冷漠，是不是独自面对着所有的耻笑？');

var getMingYanContent = function() {
    return mottos[Math.floor(Math.random() * mottos.length)];
};