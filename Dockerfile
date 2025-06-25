# Faza e ndërtimit me .NET 8
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore Admin.csproj
RUN dotnet publish Admin.csproj -c Release -o /app/publish

# Faza e runtime-it me .NET 8
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Admin.dll"]
