import argparse
import os
import cv2
import numpy as np
from decouple import config

def cargar_imagenes(ruta_img1, ruta_img2):
    img1 = cv2.imread(ruta_img1)
    img2 = cv2.imread(ruta_img2)
    return img1, img2

def detectar_rostros(imagen):
    gray = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    #ajustamos los parametros para que reconozca a las personas
    scale_factor = 1 #variable que controla el tamaño maximo de ampliacion o escala
    min_neighbors = 4 # variable que controla los 
    #antiguos 1.3 y 5
    rostros = face_cascade.detectMultiScale(gray, scaleFactor = scale_factor, minNeighbors=min_neighbors)

    return rostros

def comparar_rostros(rostro1, rostro2):
    # Redimensionar rostros para que tengan el mismo tamaño
    ancho_max = max(rostro1.shape[1], rostro2.shape[1])
    alto_max = max(rostro1.shape[0], rostro2.shape[0])

    rostro1 = cv2.resize(rostro1, (ancho_max, alto_max))
    rostro2 = cv2.resize(rostro2, (ancho_max, alto_max))

    # Calcula la diferencia de las características de los rostros
    diferencia = cv2.absdiff(rostro1, rostro2)
    #print(f"la diferencia es: ",diferencia)
    # Calcula la distancia euclidiana
    distancia = np.sqrt(np.sum(diferencia**2))
    #print(f"la distancia obtenida es: ",distancia)
    return distancia

def obtener_nombre_sin_extension(ruta):
    nombre_archivo = os.path.splitext(os.path.basename(ruta))[0]
    return nombre_archivo

def main():
    API_RUTA_ALMACEN = config('RUTA_CARPETA_ALMACEN')
    # Configuración de argumentos de la línea de comandos
    parser = argparse.ArgumentParser(description="Comparar imágenes de rostros y dar la bienvenida si coinciden.")
    parser.add_argument("imagen_a_comparar", help="Nombre de la imagen a comparar")

    # Parsea los argumentos de la línea de comandos
    args = parser.parse_args()

    # Ruta de la imagen a comparar
    ruta_img1 = args.imagen_a_comparar

    # Buscar imagen en la carpeta /var/www/html/fotos
    ruta_carpeta_fotos = API_RUTA_ALMACEN
    imagenes_en_carpeta = os.listdir(ruta_carpeta_fotos)
    print(f"listas->",imagenes_en_carpeta)
    imagen_base = None
    for imagen in imagenes_en_carpeta:
        print(f"imagenes en directorio -> ",imagen)
        #print(os.path.join(ruta_carpeta_fotos, ruta_img1).split("/")[-1])
        #Compara tanto si es una imagen, como si el archivo se llama igual que el que esta buscando
        if imagen.lower().endswith(('.png', '.jpg', '.jpeg')) and imagen.lower().endswith(os.path.join(ruta_carpeta_fotos, ruta_img1).split("/")[-1]):  # Solo considerar imágenes
        #if imagen.lower().endswith(('.png', '.jpg', '.jpeg')):
            print(f"imagen encontrada -> ",imagen)
            imagen_base = os.path.join(ruta_carpeta_fotos, imagen)
            # break
    #    if imagen_base is None:
    #        print("No se encontraron imágenes en la carpeta /var/www/html/fotos")
    #        return

            # Cargar imágenes
            img1, img2 = cargar_imagenes(ruta_img1, imagen_base)

            rostros_img1 = detectar_rostros(img1)
            rostros_img2 = detectar_rostros(img2)

            if len(rostros_img1) == 0 or len(rostros_img2) == 0:
                print("No se detectó ningún rostro en al menos una de las imágenes.")
                print(False)
                return

            # Tomar el primer rostro detectado en cada imagen
            rostro1 = img1[rostros_img1[0][1]:rostros_img1[0][1]+rostros_img1[0][3], rostros_img1[0][0]:rostros_img1[0][0]+rostros_img1[0][2]]
            rostro2 = img2[rostros_img2[0][1]:rostros_img2[0][1]+rostros_img2[0][3], rostros_img2[0][0]:rostros_img2[0][0]+rostros_img2[0][2]]

            # Compara los rostros
            distancia = comparar_rostros(rostro1, rostro2)

            # Establece un umbral de decisión
            umbral = 255 # de 0 a 255 entre menor el numero mayor la presicion
            if distancia < umbral:
                nombre_archivo_base = obtener_nombre_sin_extension(imagen_base)
                print(f"Bienvenid@ {nombre_archivo_base}")
                print(True)
                #return True
                break
            else:
                print("Las imágenes contienen personas diferentes.")
                print(False)
                #return False

if __name__ == "__main__":
    main()

