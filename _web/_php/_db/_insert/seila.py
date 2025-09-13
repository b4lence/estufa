nome = open('_php/_db/_insert/_values/nome.txt', 'r', encoding='utf-8')
temperatura_min = open('_php/_db/_insert/_values/temperatura_min.txt', 'r', encoding='utf-8')
temperatura_max = open('_php/_db/_insert/_values/temperatura_max.txt', 'r', encoding='utf-8')
umidade_min = open('_php/_db/_insert/_values/umidade_max.txt', 'r', encoding='utf-8')
umidade_max = open('_php/_db/_insert/_values/umidade_min.txt', 'r', encoding='utf-8')

new_txt = open('_php/_db/_insert/INSERT.txt', 'w', encoding='utf-8')

new_txt.write("INSERT INTO plantas (nome, temperatura, umidade_solo) VALUES\n")
for i in range(75):
    nome_str = nome.readline().rstrip()
    temperatura_media = (int(temperatura_min.readline()) + int(temperatura_max.readline())) / 2
    umidade_media = (int(umidade_max.readline()) + int(umidade_min.readline())) / 2

    new_txt.write(f"\t(\"{nome_str}\", {temperatura_media}, {umidade_media}),\n" if i != 74 else f"\t(\"{nome_str}\", {temperatura_media}, {umidade_media})")
new_txt.close()
nome.close()
temperatura_min.close()
temperatura_max.close()
umidade_min.close()
umidade_max.close()