nome = open('_php/_db/_insert/_values/nome.txt', 'r', encoding='utf-8')
temperatura_min = open('_php/_db/_insert/_values/temp_min.txt', 'r', encoding='utf-8')
temperatura_max = open('_php/_db/_insert/_values/temp_max.txt', 'r', encoding='utf-8')
umidade_min = open('_php/_db/_insert/_values/umidade_solo_max.txt', 'r', encoding='utf-8')
umidade_max = open('_php/_db/_insert/_values/umi_solo_min.txt', 'r', encoding='utf-8')

new_txt = open('_php/_db/_insert/INSERT.txt', 'w', encoding='utf-8')

new_txt.write("INSERT INTO plantas (nome, temperatura, umidade_solo, umidade_ar, foto) VALUES\n")
for i in range(150):
    nome_str = nome.readline().rstrip()
    temperatura_media = (int(temperatura_min.readline()) + int(temperatura_max.readline())) / 2
    umidade_media = (int(umidade_max.readline()) + int(umidade_min.readline())) / 2

    new_txt.write(f"\t(\"{nome_str}\", {temperatura_media}, {umidade_media}, {umidade_media}, 'aafolou.jpg'),\n" if i != 74 else f"\t(\"{nome_str}\", {temperatura_media}, {umidade_media}, {umidade_media}, 'aafolou.jpg')")
new_txt.close()
nome.close()
temperatura_min.close()
temperatura_max.close()
umidade_min.close()
umidade_max.close()