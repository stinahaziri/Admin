# Faza e ndërtimit me .NET 9 SDK
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /app

# Kopjo të gjithë fajllat e projektit në kontejner
COPY . ./

# Restore dependencies
RUN dotnet restore Admin.csproj

# Build dhe publish
RUN dotnet publish Admin.csproj -c Release -o /app/publish

# Faza e ekzekutimit me runtime më të lehtë
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS runtime
WORKDIR /app

# Kopjo output-in nga faza e ndërtimit
COPY --from=build /app/publish .

# Start aplikacionin
ENTRYPOINT ["dotnet", "Admin.dll"]
