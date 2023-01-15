import json

id = 0

chicha_file = open("chicha.json")
gongcha_file = open("gongcha.json")
liho_file = open("LiHo.json")
playmade_file = open("playmade.json")
koi_file = open("koi.json")

chicha = json.load(chicha_file)
gongcha = json.load(gongcha_file)
liho = json.load(liho_file)
playmade = json.load(playmade_file)
koi = json.load(koi_file)

for store in chicha:
  store["id"] = str(id)
  id += 1

for store in gongcha:
  store["id"] = str(id)
  id += 1

for store in liho:
  store["id"] = str(id)
  id += 1

for store in playmade:
  store["id"] = str(id)
  id += 1

for store in koi:
  store["id"] = str(id)
  id += 1

chicha.extend(gongcha)
chicha.extend(liho)
chicha.extend(playmade)
chicha.extend(koi)

with open("stores.json", "w") as outfile:
    json.dump(chicha, outfile)

chicha_file.close()
gongcha_file.close()
liho_file.close()
playmade_file.close()
koi_file.close()
